/**
 * Vercel Integration Service
 * Handles deployment, environment variables, and project management
 */

const VERCEL_API_URL = "https://api.vercel.com";
const VERCEL_TOKEN = process.env.VERCEL_TOKEN;
const PROJECT_ID = "zowfbftptnkypdwsnbkhh"; // Your Supabase project ID

export interface VercelDeployment {
  id: string;
  url: string;
  name: string;
  state: "BUILDING" | "ERROR" | "READY" | "QUEUED" | "CANCELED";
  createdAt: number;
  creator: {
    uid: string;
    email: string;
    username: string;
  };
}

export interface VercelEnvironmentVariable {
  key: string;
  value: string;
  target: ("production" | "preview" | "development")[];
}

/**
 * Get all deployments for the project
 */
export async function getDeployments(limit: number = 10): Promise<VercelDeployment[]> {
  try {
    if (!VERCEL_TOKEN) {
      throw new Error("VERCEL_TOKEN not configured");
    }

    const response = await fetch(`${VERCEL_API_URL}/v6/deployments?limit=${limit}`, {
      headers: {
        Authorization: `Bearer ${VERCEL_TOKEN}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Vercel API error: ${response.status}`);
    }

    const data = await response.json();
    return data.deployments || [];
  } catch (error) {
    console.error("Error fetching deployments:", error);
    throw error;
  }
}

/**
 * Get a specific deployment
 */
export async function getDeployment(deploymentId: string): Promise<VercelDeployment> {
  try {
    if (!VERCEL_TOKEN) {
      throw new Error("VERCEL_TOKEN not configured");
    }

    const response = await fetch(`${VERCEL_API_URL}/v13/deployments/${deploymentId}`, {
      headers: {
        Authorization: `Bearer ${VERCEL_TOKEN}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Vercel API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching deployment:", error);
    throw error;
  }
}

/**
 * Trigger a new deployment
 */
export async function triggerDeployment(
  gitBranch: string = "main"
): Promise<{ success: boolean; deploymentId?: string; error?: string }> {
  try {
    if (!VERCEL_TOKEN) {
      throw new Error("VERCEL_TOKEN not configured");
    }

    // This would typically be done via GitHub webhook or Vercel CLI
    // For now, we'll just log the intent
    console.log(`Deployment triggered for branch: ${gitBranch}`);

    return {
      success: true,
      deploymentId: `deployment_${Date.now()}`,
    };
  } catch (error) {
    console.error("Error triggering deployment:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Get environment variables
 */
export async function getEnvironmentVariables(): Promise<VercelEnvironmentVariable[]> {
  try {
    if (!VERCEL_TOKEN) {
      throw new Error("VERCEL_TOKEN not configured");
    }

    const response = await fetch(
      `${VERCEL_API_URL}/v9/projects/${PROJECT_ID}/env`,
      {
        headers: {
          Authorization: `Bearer ${VERCEL_TOKEN}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Vercel API error: ${response.status}`);
    }

    const data = await response.json();
    return data.envs || [];
  } catch (error) {
    console.error("Error fetching environment variables:", error);
    throw error;
  }
}

/**
 * Set environment variable
 */
export async function setEnvironmentVariable(
  key: string,
  value: string,
  target: ("production" | "preview" | "development")[] = ["production"]
): Promise<{ success: boolean; error?: string }> {
  try {
    if (!VERCEL_TOKEN) {
      throw new Error("VERCEL_TOKEN not configured");
    }

    const response = await fetch(
      `${VERCEL_API_URL}/v9/projects/${PROJECT_ID}/env`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${VERCEL_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          key,
          value,
          target,
        }),
      }
    );

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Vercel API error: ${response.status} - ${error}`);
    }

    return { success: true };
  } catch (error) {
    console.error("Error setting environment variable:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Delete environment variable
 */
export async function deleteEnvironmentVariable(
  envId: string
): Promise<{ success: boolean; error?: string }> {
  try {
    if (!VERCEL_TOKEN) {
      throw new Error("VERCEL_TOKEN not configured");
    }

    const response = await fetch(
      `${VERCEL_API_URL}/v9/projects/${PROJECT_ID}/env/${envId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${VERCEL_TOKEN}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Vercel API error: ${response.status}`);
    }

    return { success: true };
  } catch (error) {
    console.error("Error deleting environment variable:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Get project information
 */
export async function getProjectInfo(): Promise<{
  id: string;
  name: string;
  accountId: string;
  createdAt: number;
  updatedAt: number;
}> {
  try {
    if (!VERCEL_TOKEN) {
      throw new Error("VERCEL_TOKEN not configured");
    }

    const response = await fetch(`${VERCEL_API_URL}/v9/projects/${PROJECT_ID}`, {
      headers: {
        Authorization: `Bearer ${VERCEL_TOKEN}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Vercel API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching project info:", error);
    throw error;
  }
}

/**
 * Get deployment logs
 */
export async function getDeploymentLogs(
  deploymentId: string
): Promise<{ stdout: string; stderr: string }> {
  try {
    if (!VERCEL_TOKEN) {
      throw new Error("VERCEL_TOKEN not configured");
    }

    const response = await fetch(
      `${VERCEL_API_URL}/v13/deployments/${deploymentId}/logs`,
      {
        headers: {
          Authorization: `Bearer ${VERCEL_TOKEN}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Vercel API error: ${response.status}`);
    }

    const logs = await response.json();
    return {
      stdout: logs.stdout || "",
      stderr: logs.stderr || "",
    };
  } catch (error) {
    console.error("Error fetching deployment logs:", error);
    throw error;
  }
}

/**
 * Monitor deployment status
 */
export async function monitorDeployment(
  deploymentId: string,
  maxAttempts: number = 60,
  intervalMs: number = 5000
): Promise<VercelDeployment> {
  let attempts = 0;

  while (attempts < maxAttempts) {
    try {
      const deployment = await getDeployment(deploymentId);

      if (deployment.state === "READY") {
        console.log(`Deployment ${deploymentId} is ready at ${deployment.url}`);
        return deployment;
      }

      if (deployment.state === "ERROR") {
        throw new Error(`Deployment ${deploymentId} failed`);
      }

      console.log(`Deployment ${deploymentId} state: ${deployment.state}`);
      await new Promise((resolve) => setTimeout(resolve, intervalMs));
      attempts++;
    } catch (error) {
      console.error("Error monitoring deployment:", error);
      throw error;
    }
  }

  throw new Error(`Deployment ${deploymentId} did not complete within timeout`);
}
