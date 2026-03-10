type EnvKey = "VITE_SERVICE_ID" | "VITE_TEMPLATE_ID" | "VITE_PUBLIC_KEY";

function getEnv(name: EnvKey): string {
  const value = import.meta.env[name];

  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }

  return value;
}

export const env = {
  serviceId: getEnv("VITE_SERVICE_ID"),
  templateId: getEnv("VITE_TEMPLATE_ID"),
  publicKey: getEnv("VITE_PUBLIC_KEY"),
} as const;
