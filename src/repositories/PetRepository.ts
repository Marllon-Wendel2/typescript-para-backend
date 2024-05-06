import { Repository } from "typeorm";
import PetEntity from "../entities/PetEntity";
import InterfacePetRepository from "./interfaces/InterfacePetRepository";

export default class PetRepository implements InterfacePetRepository {
    private repository:Repository<PetEntity>

    constructor(repository: Repository<PetEntity>) {
        this.repository = repository
    }
    async listaPet(): Promise<PetEntity[]> {
        return await this.repository.find()
    }
     async atualizaPet(id: number, newData: PetEntity): Promise <{ sucess: boolean, message?: string}>  {
        try {
            const petToUpdate = await this.repository.findOne({ where: { id }})

            if(!petToUpdate) {
                return { sucess: false, message: "Pet não encontrado"}
            }

            Object.assign(petToUpdate, newData);

            await this.repository.save(petToUpdate);
            return {sucess: true};
        } catch (error) {
            return {
                sucess: false,
                message: "Erro ao tentar consultar"
            };
        }
    }
    async deletaPet(id: number): Promise <{ sucess: boolean, message?: string}> {
        try {
            const petToRemove = await this.repository.findOne({ where: {id}});

            if(!petToRemove) {
                return { sucess: false, message: "Pet não encontrado" }
            }

            await this.repository.remove(petToRemove);

            return {
                sucess: true
            }
        }catch {
            return {
                sucess: false,
                message: "Erro ao tentar deletear"
            }
        }
    }
    criaPet(pet: PetEntity): void {
        this.repository.save(pet);
}
}