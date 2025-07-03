import { NotificationGateway } from "./notification.gateway";

describe("NotificationGateway", () => {
  let gateway: NotificationGateway;

  beforeEach(() => {
    gateway = new NotificationGateway();
  });

  it("should be defined", () => {
    expect(gateway).toBeDefined();
  });

  it("should have a WebSocket server property", () => {
    expect(gateway.server).toBeUndefined();
    const fakeServer = { emit: jest.fn() } as any;
    gateway.server = fakeServer;
    expect(gateway.server).toBe(fakeServer);
  });
});
