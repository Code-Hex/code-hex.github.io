package config

import (
	"fmt"

	"github.com/kelseyhightower/envconfig"
	"github.com/pkg/errors"
)

const (
	envDevelopment = "development"
	envProduction  = "production"
)

// Env stores configuration settings extract from enviromental variables
// by using https://github.com/kelseyhightower/envconfig
//
// The practice getting from environmental variables comes from https://12factor.net.
type Env struct {
	// LogLevel is INFO or DEBUG. Default is "INFO".
	LogLevel string `envconfig:"LOG_LEVEL" default:"INFO"`

	// STAGE is environment where application is running.
	// "development" or "production".
	STAGE string `envconfig:"ENV" required:"true"`

	// GCPProjectID is you service GCP project ID. You can create your own
	// service GCP project by https://github.com/kouzoh/microservices-terraform.
	GCPProjectID string `envconfig:"GCP_PROJECT_ID" required:"true"`

	// Port is port to listen. Default is 10000.
	HTTPPort int `envconfig:"HTTP_PORT" default:"10000"`
}

// IsProduction returns true if it is production environment
func (e *Env) IsProduction() bool {
	return e.STAGE == envProduction
}

// validate validates
func (e *Env) validate() error {
	checks := []struct {
		bad    bool
		errMsg string
	}{
		{
			e.STAGE != envDevelopment && e.STAGE != envProduction,
			fmt.Sprintf("invalid env is specified: %q", e.STAGE),
		},
	}

	for _, check := range checks {
		if check.bad {
			return errors.Errorf(check.errMsg)
		}
	}

	return nil
}

// ReadFromEnv reads configuration from environmental variables
// defined by Env struct.
func ReadFromEnv() (*Env, error) {
	var env Env
	if err := envconfig.Process("", &env); err != nil {
		return nil, errors.Wrap(err, "failed to process envconfig")
	}

	if err := env.validate(); err != nil {
		return nil, err
	}

	return &env, nil
}
