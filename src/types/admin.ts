export interface PendingLawyers {
    totalPages: number,
    totalElements: number,
    first: boolean,
    last: boolean,
    size: number,
    content: [
        {
            lawyerId: number,
            name: string,
            phoneNumber: string,
            description: string,
            approvalStatus: string,
        }
    ],
    number: number,
    sort: [
        {
            direction: string,
            nullHandling: string,
            ascending: boolean,
            property: string,
            ignoreCase: boolean
        }
    ],
    numberOfElements: number,
    pageable: {
        pageNumber: number,
        offset: number,
        sort: [
            {
                direction: string,
                nullHandling: string,
                ascending: boolean,
                property: string,
                ignoreCase: boolean
            }
        ],
        pageSize: number,
        paged: boolean,
        unpaged: boolean
    },
    empty: boolean
}

export interface DetailedPendingLawyer {
    lawyerId: number,
    name: string,
    phoneNumber: string,
    description: string,
    career: string[],
    educations: string[],
    officeInfo: {
        officeName: string,
        officeAddress: string,
        officePhoneNumber: string
    },
    approvalStatus: string,
    licenseImageInfo: {
        id: number,
        name: string,
        contentType: string,
        size: number,
        path: string
    },
    createdAt: string,
    updatedAt: string
}