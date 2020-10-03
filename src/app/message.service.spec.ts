import { MessageService } from "./message.service"

describe('MessageService', () => {
    let service: MessageService

    beforeEach(() => {
        service = new MessageService();
    })

    it('should have no messages to start with', () => {
        expect(service.messages.length).toBe(0)
    })

    it('should add a message when called', () => {
        service.add('first message')
        expect(service.messages.length).toBe(1)
    })

    it('should add a message when called', () => {
        service.add('first message')
        service.add('second message')
        
        service.clear();

        expect(service.messages.length).toBe(0)
    })
})