import  {Request, Response } from "express";
import type TipoPet from "../tipo/TipoPet";
import EnumEspecie from "../enum/EnumEspecie";

let listaDePets: Array<TipoPet> = [];
let id = 0;
function geraId() {
  id = id + 1;
  return id;
}

export default class PetController {
    criaPet(req:Request, res:Response) {
        const {adotado,especie,dataDeNascimento,nome} = <TipoPet>req.body;

        if(!Object.values(EnumEspecie).includes(especie)) {
            return res.status(400).json({error : "Especie inválida"})
        }

        const novoPet: TipoPet = {id: geraId(),adotado,especie,dataDeNascimento,nome};
        const pet = listaDePets.find((pet) => pet.id === Number (id));

        if(pet) {
          res.status(500).json({message: "Pet já cadastrado"})
        } else {
            listaDePets.push(novoPet);
            return res.status(201).json(novoPet);
        } 
    }

    listaPets(req:Request, res:Response) {
        return res.status(200).json(listaDePets);
    }

    listaPetsPorId(req: Request, res: Response) {
        const { id } = req.params;
        const pet = listaDePets.find((pet) => pet.id === Number (id));
        return res.status(200).json(pet);
    }

    atualizaPet(req: Request, res: Response) {
        const { id } = req.params;
        const {adotado,especie,dataDeNascimento,nome} = <TipoPet>req.body;
        const pet = listaDePets.find((pet) => pet.id === Number(id));

        if(!id) {
            return res.status(404).json({message: "Pet não foi encontrado"});
        }

        pet.nome = nome;
        pet.especie = especie;
        pet.dataDeNascimento = dataDeNascimento;
        pet.adotado = adotado

        return res.status(200).json(pet);
    }

    deletaPet(req: Request, res: Response) {
        const { id } = req.params;

        const pet = listaDePets.find((pet) => pet.id === Number(id));

        if(!pet) {
            return res.status(404).json({message: "Pet não foi encontrado"});
        }

        const index = listaDePets.indexOf(pet);
        listaDePets.splice(index, 1);
        return res.status(200).json({menssage: "Pet deletado com sucesso" })
    }
}