import { useState } from 'react'
import { useParams } from 'react-router-dom'
import Products from '../components/Products'
import styled from 'styled-components'
import { mobile } from '../responsive/responsive'


const Container = styled.div``
const Title = styled.h1`
    margin: 20px;
`
const FilterContainer = styled.div`
    display: flex;
    justify-content: space-between;
`
const Filter = styled.div`
    margin: 20px;

    ${mobile({
    margin: '0 20px',
})}
`
const FilterText = styled.span`
    font-size: 20px;
    font-weight: 600;
    margin-right: 20px;

    ${mobile({
    marginRight: '0',
})}
`
const Select = styled.select`
    padding: 10px;
    margin-right: 20px;

    ${mobile({
    margin: '10px 0',
})}
`
const Option = styled.option``


const ProductList = () => {
    const [filters, setFilters] = useState({})
    const [sort, setSort] = useState('new')
    const { category } = useParams()

    const handleFilters = (e) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value
        })
    }


    return (
        <Container>
            <Title>
                {category ? `All ${category} clothes` : 'All clothes'}
            </Title>
            <FilterContainer>
                <Filter>
                    <FilterText>Filter by:</FilterText>
                    <Select name='color' onChange={handleFilters}>
                        <Option disabled>Color</Option>
                        <Option>white</Option>
                        <Option>black</Option>
                        <Option>red</Option>
                        <Option>blue</Option>
                        <Option>yellow</Option>
                        <Option>green</Option>
                        <Option>denim</Option>
                        <Option>brown</Option>
                        <Option>orange</Option>
                        <Option>purple</Option>
                        <Option>grey</Option>
                        <Option>pink</Option>
                    </Select>
                    <Select name='size' onChange={handleFilters}>
                        <Option disabled>Size</Option>
                        <Option>XS</Option>
                        <Option>S</Option>
                        <Option>M</Option>
                        <Option>L</Option>
                        <Option>XL</Option>
                        <Option>36</Option>
                        <Option>37</Option>
                        <Option>38</Option>
                        <Option>39</Option>
                        <Option>40</Option>
                        <Option>41</Option>
                        <Option>42</Option>
                        <Option>UNI</Option>
                    </Select>
                </Filter>
                <Filter>
                    <FilterText>Sort by:</FilterText>
                    <Select onChange={(e) => setSort(e.target.value)}>
                        <Option value='new'>Newest</Option>
                        <Option value='asc'>Price (Low to High)</Option>
                        <Option value='desc'>Price (High to Low)</Option>
                    </Select>
                </Filter>
            </FilterContainer>
            <Products category={category} filters={filters} sort={sort} />
        </Container>
    )
}

export default ProductList