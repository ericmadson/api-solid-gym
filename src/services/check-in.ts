import { CheckIn } from '@prisma/client';
import { CheckInsRepository } from "@/repositories/check-ins-repository";

interface CheckInUseCaseRequest {
    userId: string;
    gymId: string;
}

type CheckInUseCaseResponse = {
    checkIn: CheckIn
}

export class CheckInUseCase {
    constructor(
        private checkInsRepository: CheckInsRepository,
    ) {}

    async execute({userId, gymId}: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
        const checkOnSameDay = await this.checkInsRepository.findByUserIdOnDate(userId, new Date());

        if (checkOnSameDay) {
            throw new Error()
        }
        
        const checkIn = await this.checkInsRepository.create({
            gym_id: gymId,
            user_id: userId
        });

        return { checkIn }
    }
}