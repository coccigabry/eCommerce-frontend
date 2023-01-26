import styled from "styled-components"
import { mobile } from "../responsive/responsive"
import { Link } from "react-router-dom"


const Container = styled.div`
    flex: 1;
    margin: 3px;
    height: 70vh;
    position: relative;
`
const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;

    ${mobile({
    height: '20vh',
})}
`
const Info = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`
const Title = styled.h1`
    color: black;
    margin-bottom: 20px;
`
const Button = styled.button`
    border: none;
    padding: 10px;
    background-color: #fff;
    color: gray;
    cursor: pointer;
    font-weight: 600;
`

const CategoryItem = ({ img, title, category }) => {

    return (
        <Container>
            <Image src={img} alt={title} />
            <Info>
                <Title>{title}</Title>
                <Link to={`/products/${category}`}>
                    <Button>SHOP NOW</Button>
                </Link>
            </Info>
        </Container>
    )
}

export default CategoryItem