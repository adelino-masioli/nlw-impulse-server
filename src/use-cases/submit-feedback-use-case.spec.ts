import { SubmitFeedbackUseCase } from "./submit-feedback-use-case";

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
  { create: createFeedbackSpy },
  { sendMail: sendMailSpy }
);

describe("Submit feedback", () => {
  it("should be able to submit a feedback", async () => {
    await expect(
      submitFeedback.execute({
        type: "BUG",
        comment: "Comment",
        screenshot: "data:image/png;base64,25487abc",
      })
    ).resolves.not.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sendMailSpy).toHaveBeenCalled();
  });

  it("should not be able to submit a feedback without type", async () => {
    await expect(
      submitFeedback.execute({
        type: "",
        comment: "Comment",
        screenshot: "data:image/png;base64,25487abc",
      })
    ).rejects.toThrow();
  });

  it("should not be able to submit a feedback without comment", async () => {
    await expect(
      submitFeedback.execute({
        type: "BUG",
        comment: "",
        screenshot: "data:image/png;base64,25487abc",
      })
    ).rejects.toThrow();
  });

  it("should not be able to submit a feedback without an invalid screenshot type", async () => {
    await expect(
      submitFeedback.execute({
        type: "BUG",
        comment: "Comment",
        screenshot: "test.jpg",
      })
    ).rejects.toThrow();
  });
});
