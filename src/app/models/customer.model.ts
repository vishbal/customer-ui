export interface ICustomer {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    createdDate: Date;
    updatedDate: Date;
}

export function getDefaultCustomer(): ICustomer {
    return {
        id: 0,
        firstName: '',
        lastName: '',
        email: '',
        createdDate: new Date(),
        updatedDate: new Date()
    };
}