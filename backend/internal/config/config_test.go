package config

import (
	"os"
	"testing"
)

const (
	testGCPProjectID = "merpay-toukibo-jp"
	testSentryDSN    = "https://key:secret@sentry.io/merpay-toukibo-jp"
)

func TestReadFromEnv(t *testing.T) {
	reset := setenvs(t, map[string]string{
		"LOG_LEVEL":      "INFO",
		"ENV":            envDevelopment,
		"GCP_PROJECT_ID": testGCPProjectID,
	})
	defer reset()

	env, err := ReadFromEnv()
	if err != nil {
		t.Fatalf("err: %s", err)
	}

	if got, want := env.LogLevel, "INFO"; got != want {
		t.Fatalf("got %v, want %v", got, want)
	}

	if got, want := env.GCPProjectID, testGCPProjectID; got != want {
		t.Fatalf("got %v, want %v", got, want)
	}
}

func TestReadFromEnvValidationFailed(t *testing.T) {
	reset := setenvs(t, map[string]string{
		"ENV": "prod",
	})
	defer reset()

	_, err := ReadFromEnv()
	if err == nil {
		t.Fatalf("expect to be faield")
	}
}

func TestReadFromEnvProcessFailed(t *testing.T) {
	reset := unsetenv(t, "ENV")
	defer reset()

	_, err := ReadFromEnv()
	if err == nil {
		t.Fatalf("expect to be faield")
	}
}

func TestValidate(t *testing.T) {
	cases := map[string]struct {
		env     *Env
		success bool
	}{
		"valid": {
			&Env{
				STAGE: envDevelopment,
			},
			true,
		},
		"invalid env": {
			&Env{
				STAGE: "staging",
			},
			false,
		},
	}

	for name, tc := range cases {
		t.Run(name, func(t *testing.T) {
			err := tc.env.validate()
			if err != nil {
				if tc.success {
					t.Fatalf("expect not to be failed: %s", err)
				}
				return
			}

			if !tc.success {
				t.Fatalf("expect to be failed")
			}
		})
	}
}

func setenv(t *testing.T, k, v string) func() {
	t.Helper()

	prev := os.Getenv(k)
	if err := os.Setenv(k, v); err != nil {
		t.Fatal(err)
	}

	return func() {
		if prev == "" {
			os.Unsetenv(k)
		} else {
			if err := os.Setenv(k, prev); err != nil {
				t.Fatal(err)
			}
		}
	}
}

func unsetenv(t *testing.T, k string) func() {
	t.Helper()

	prev := os.Getenv(k)
	if err := os.Unsetenv(k); err != nil {
		t.Fatal(err)
	}

	return func() {
		if prev == "" {
			return
		}
		if err := os.Setenv(k, prev); err != nil {
			t.Fatal(err)
		}
	}
}

func setenvs(t *testing.T, kv map[string]string) func() {
	t.Helper()

	resetFs := make([]func(), 0, len(kv))
	for k, v := range kv {
		resetF := setenv(t, k, v)
		resetFs = append(resetFs, resetF)
	}

	return func() {
		for _, resetF := range resetFs {
			resetF()
		}
	}
}
