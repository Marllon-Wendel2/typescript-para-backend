import PetEntity from "../../entities/PetEntity";

export default interface InterfacePetRepository {
    criaPet( pet:PetEntity): void;
    listaPet():Array<PetEntity> | Promise<PetEntity[]>;
    atualizaPet(id: number, pet: PetEntity):Promise<{sucess: boolean, message?: string}> | void;
    deletaPet(id: number, pet: PetEntity): Promise<{sucess: boolean, message?: string}>| void;
}