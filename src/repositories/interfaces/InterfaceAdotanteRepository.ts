import AdotanteEntity from "../../entities/AdotanteEntity";
import EnderecoEntity from "../../entities/Endereco";

export default interface InterfaceAdotanteRepository {
    criaAdotante(adotante: AdotanteEntity): void | Promise<void>;

    listaAdotantes(): AdotanteEntity[] | Promise<AdotanteEntity[]>;

    atualizaAdotantes(
        id: number,
        adotante: AdotanteEntity
    ): Promise<{ success: boolean;
        message?: string
    }> | void;

    deletaAdotante(
        id: number
    ): Promise<{ success: boolean;
        message?: string
    }> | void
}