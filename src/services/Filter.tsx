import $api from "../http";
import {AxiosResponse} from 'axios'
import {Filter} from "../interfaces/BasicInterface";

const FilterService =() =>{
    const getFiltres = async (categoryName: string | undefined): Promise<AxiosResponse<Filter>> =>{
        return $api.get<Filter>(`/attributes/${categoryName}`)
    }

    return {getFiltres}
}

export default FilterService;