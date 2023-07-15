import { Link } from "react-router-dom"

export const Error = () => {
    return (
        <section className="errorSection">
        <h2>Vous n&apos;êtes pas au bon endroit</h2>
        <Link to='/'>Retour à l&apos;accueil</Link>
        </section>
    )
}