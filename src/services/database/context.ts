// NOTE: Do not modify this file
export const getContextByValue = (value: string): Promise<string | null> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const mockContextData = [
        {
          value: "hello",
          context: "GREETING",
        },
        {
          value: "hi",
          context: "GREETING",
        },
        {
          value: "goodbye",
          context: "END",
        },
        {
          value: "bye",
          context: "END",
        },
      ];

      const index = mockContextData.findIndex((data) => data.value === value);
      resolve((mockContextData[index] || { context: null }).context);
    }, 1500);
  });
};
