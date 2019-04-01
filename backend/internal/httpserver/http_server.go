package httpserver

type (
	// Mux manages handlers.
	Mux struct {
		mux      *http.ServeMux
		adapters []adapter.Adapter
	}
	// Server represents an HTTP server.
	Server struct {
		logger       *zap.Logger
		sentryClient *raven.Client

		server *http.Server

		authClient authority.Client
	}
	// Config represents argument for Server.
	Config struct {
		ServiceName    string
		Version        string
		ENV            string
		Logger         *zap.Logger

		ToukiboService toukibo.Service
	}
)

// NewServer creates new HTTP server. The handlers are registered inside
// this function.
func New(c *Config) (*Server, error) {
	mux := &Mux{
		mux: newBaseServeMux(c.AuthClient, c.Version),
		// if set adapter like []Adapter{A(), B()}
		// we will access A() -> B() -> main -> B() -> A()
		adapters: []adapter.Adapter{
			log_adapter.ZapAdapter(c.Logger),
			authority_adapter.Adapter(c.AuthClient),
			recovery_adapter.Adapter(
				recovery_adapter.WithSentry(c.SentryClient),
				recovery_adapter.WithCtxZap(),
			),
			log.CtxZapCacheAdapter(),
			dd_adapter.InstrumentsAdapter(c.DDStatsdClient, c.ServiceName),
			dd_adapter.TraceAdapter(c.ServiceName, c.ENV),
			self_adapter.IsAvailableServerAdapter(),
			self_adapter.AuthOperatorServerAdapter(c.TokenExtractor),
		},
	}

	mux.RegisterApplicationHandlers(c.ToukiboService)

	return &Server{
		logger:       c.Logger,
		sentryClient: c.SentryClient,
		authClient:   c.AuthClient,
		server: &http.Server{
			Handler: mux,
		},
	}, nil
}

// Serve starts accept requests from the given listener. If any returns error.
func (s *Server) Serve(ln net.Listener) error {
	// ErrServerClosed is returned by the Server's Serve
	// after a call to Shutdown or Close, we can ignore it.
	if err := s.server.Serve(ln); err != nil && err != http.ErrServerClosed {
		return err
	}
	return nil
}

// Shutdown gracefully shutdown the server without interrupting any
// active connections. If any returns error.
func (s *Server) Shutdown(ctx context.Context) error {
	return s.server.Shutdown(ctx)
}

// ServeHTTP for represents http.Handler
func (m *Mux) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	m.mux.ServeHTTP(w, r)
}