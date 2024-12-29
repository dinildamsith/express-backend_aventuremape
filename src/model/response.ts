class ResponseDto {
    private status: string;
    private description: string;
    private data: any;

    constructor() {
        this.status = '';
        this.description = '';
        this.data = null;
    }

    setStatus(status: string) {
        this.status = status;
    }

    setDescription(description: string) {
        this.description = description;
    }

    setData(data: any) {
        this.data = data;
    }

    toJSON() {
        return {
            status: this.status,
            description: this.description,
            data: this.data,
        };
    }
}


export default ResponseDto;