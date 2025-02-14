import { Repository } from "typeorm"
import AdotanteEntity from "../entities/AdotanteEntity"
import InterfaceAdotanteRepository from "./interfaces/InterfaceAdotanteRepository"

export default class AdotanteRepository implements InterfaceAdotanteRepository{
    constructor(private repository: Repository<AdotanteEntity>) {}

    criaAdotante(adotante: AdotanteEntity):void | Promise<void> {
        this.repository.save(adotante)
    }

    async listaAdotantes(): Promise<AdotanteEntity[]> {
        return await this.repository.find();
      }
      async atualizaAdotantes(
        id: number,
        newData: AdotanteEntity
      ): Promise<{ success: boolean; message?: string }> {
        try {
          const adotanteToUpdate = await this.repository.findOne({ where: { id } });
    
          if (!adotanteToUpdate) {
            return { success: false, message: "Adotante não encontrado" };
          }
    
          Object.assign(adotanteToUpdate, newData);
    
          await this.repository.save(adotanteToUpdate);
    
          return { success: true };
        } catch (error) {
          console.log(error);
          return {
            success: false,
            message: "Ocorreu um erro ao tentar atualizar o adotante.",
          };
        }
      }
    
      async deletaAdotante(
        id: number
      ): Promise<{ success: boolean; message?: string }> {
        try {
          const adotanteToRemove = await this.repository.findOne({ where: { id } });
    
          if (!adotanteToRemove) {
            return { success: false, message: "Adotante não encontrado" };
          }
    
          await this.repository.remove(adotanteToRemove);
    
          return { success: true };
        } catch (error) {
          // Se ocorrer um erro inesperado, você pode retornar uma mensagem genérica ou personalizada.
          return {
            success: false,
            message: "Ocorreu um erro ao tentar excluir o adotante.",
          };
        }
      }
    }