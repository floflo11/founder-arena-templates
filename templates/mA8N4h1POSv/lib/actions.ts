"use server"

export const checkEnvs = async () => {
  return {
    envs: [
      {
        name: "BASEHUB_TOKEN",
        label: "BaseHub Read Token",
        value: process.env.BASEHUB_TOKEN,
        isValid: !!process.env.BASEHUB_TOKEN,
      },
    ],
  };
};
