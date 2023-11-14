import { UsersRepositoryInMemory } from "@modules/accounts/repositories/implementations/in-memory/UsersRepositoryInMemory";
import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/implementations/in-memory/UsersTokenRepositoryInMemory";
import { MailProviderInMemory } from "@shared/container/providers/MailProvider/in-memory/MailProviderInMemory";
import { AppError } from "@shared/errors/AppError";

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let usersTokenRepositoryInMemory: UsersTokensRepositoryInMemory;
let mailProvider: MailProviderInMemory;

describe("Send Forgot Mail", () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        usersTokenRepositoryInMemory = new UsersTokensRepositoryInMemory();
        dateProvider = new DayjsDateProvider();
        mailProvider = new MailProviderInMemory();
        sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
            usersRepositoryInMemory,
            usersTokenRepositoryInMemory,
            dateProvider,
            mailProvider,
        );
    });

    it("should be able to send a forgot password mail to user", async () => {
        const sendMail = jest.spyOn(mailProvider, "sendMail");

        await usersRepositoryInMemory.create({
            driver_license: "134808",
            email: "ac@rentx.com",
            name: "Test Send Mail",
            password: "1234",
        });

        await sendForgotPasswordMailUseCase.execute("ac@rentx.com");

        expect(sendMail).toHaveBeenCalled();
    });

    it("should not be able to send an email if user does not exists", async () => {
        await expect(
            sendForgotPasswordMailUseCase.execute("kd@rentx.com"),
        ).rejects.toEqual(new AppError("User does not exists!"));
    });

    it("should be able to create an users token", async () => {
        const generateTokenMail = jest.spyOn(
            usersTokenRepositoryInMemory,
            "create",
        );

        await usersRepositoryInMemory.create({
            driver_license: "1343452",
            email: "ct@rentx.com",
            name: "Test Send Mail",
            password: "1234",
        });

        await sendForgotPasswordMailUseCase.execute("ct@rentx.com");

        expect(generateTokenMail).toHaveBeenCalled();
    });
});
