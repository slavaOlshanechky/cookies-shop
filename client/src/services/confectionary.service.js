import httpService from './http.service';

const confectionaryEndpoint = 'category/';

const confectionaryService = {
    fetchAll: async () => {
        const { data } = await httpService.get(confectionaryEndpoint);
        return data;
    },
    create: async (payload) => {
        const { data } = await httpService.post(confectionaryEndpoint, payload);
        return data;
    },
    delete: async (confectionaryID) => {
        const { data } = await httpService.delete(confectionaryEndpoint + confectionaryID);
        return data;
    },
    getLastIndex: async () => {
        const { data } = await httpService.get(confectionaryEndpoint + 'lastIndex');
        return data;
    },
    patch: async (payload) => {
        const { data } = await httpService.patch(
            confectionaryEndpoint + payload._id, payload
        );
        return data;
    }
};

export default confectionaryService;
