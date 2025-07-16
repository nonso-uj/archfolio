export const routesFunc = (userSlug: string) => {
    const HOME_PAGE = '/' + userSlug

    const ABOUT_PAGE = '/' + userSlug + '/about'
    
    const WORKS_PAGE = '/' + userSlug + '/works'
    
    const CONTACT_PAGE = '/' + userSlug + '/contact'

    return { HOME_PAGE, ABOUT_PAGE, WORKS_PAGE, CONTACT_PAGE }
}