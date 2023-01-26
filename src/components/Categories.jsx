import CategoryItem from "./CategoryItem"
import styled from "styled-components"
import { categories } from '../data'
import { mobile } from "../responsive/responsive"


const Container = styled.div`
    display: flex;
    padding: 20px;
    justify-content: space-between;

    ${mobile({
        padding: '0',
        flexDirection: 'column',
    })}
`

const Categories = () => {
    const renderCategories = categories.map(item => {
        const { id } = item
        return <CategoryItem key={id} {...item}/>
    })

    return (
        <Container>
            {renderCategories}
        </Container>
    )
}

export default Categories