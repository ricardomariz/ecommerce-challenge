interface IMailProvider {
  sendEmail(
    from: string,
    to: string,
    subject: string,
    body: string
  ): Promise<void>;
}

export { IMailProvider };
