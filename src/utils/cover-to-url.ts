export const coverToUrl = async(coverName: string) => {
    return await coverName? `${process.env.BASE_URL}/images/covers/${coverName}` : "";
}