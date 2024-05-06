import  {Request, Response } from "express";
import type TipoPet from "../tipo/TipoPet";
import EnumEspecie from "../enum/EnumEspecie";
import PetRepository from "../repositories/PetRepository";
import PetEntity from "../entities/PetEntity";

let listaDePets: Array<TipoPet> = [];
let id = 0;
function geraId() {
  id = id + 1;
  return id;
}

export default class PetController {
    constructor(private repository: PetRepository) {
    }

    criaPet(req:Request, res:Response) {
        const {adotado,especie,dataDeNascimento,nome} = <PetEntity>req.body;

        if(!Object.values(EnumEspecie).includes(especie)) {
            return res.status(400).json({error : "Especie inválida"})
        }

        const novoPet = new PetEntity(nome, especie, dataDeNascimento,adotado);
           
        //funcao verifica se existe
        //const pet = listaDePets.find((pet) => pet.id === Number (id));
        //res.status(500).json({message: "Pet já cadastrado"})
        //} else {
            this.repository.criaPet(novoPet)
            return res.status(201).json(novoPet);
    }

    async listaPets(req:Request, res:Response) {
        const listaDePets = await this.repository.listaPet()
        return res.status(200).json(listaDePets);
    }

    listaPetsPorId(req: Request, res: Response) {
        const { id } = req.params;
        const pet = listaDePets.find((pet) => pet.id === Number (id));
        return res.status(200).json(pet);
    }

    async atualizaPet(req: Request, res: Response) {
        const { id } = req.params;
        const { sucess, message } = await this.repository.atualizaPet(
            Number(id),
            req.body as PetEntity
        );
        if(!sucess) {
            return res.status(404).json({ message });
        }
        return res.sendStatus(204);
    }

    async deletaPet(req: Request, res: Response) {
        const { id } = req.params;

        const { sucess, message } = await this.repository.deletaPet(Number(id));

        if(!sucess) {
            return res.status(404).json({message});
        }
        return res.sendStatus(204);
}
}