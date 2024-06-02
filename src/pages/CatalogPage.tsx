import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { ProductProjection } from '@commercetools/platform-sdk';

import { GetProdcutsParams, getProducts } from '../services/Client';

import { Header, Footer, ProductCard } from '../components';
import { AsideBlock, ContentWrapper, PageWrapper } from '../components/common/CommonStyles';
import { Grid } from '../components/common';
import CatalogFilters from '../components/CatalogFilters';

export type PriceFilter = Record<string, boolean>;

export type Filters = {
  sortField: string;
  sortDirection: string;
  filterCategory: string;
  color: string;
  size: string;
  search: string;
  filterPrice: PriceFilter;
};

const defaultFilter: Filters = {
  sortField: 'name.en',
  sortDirection: 'asc',
  filterCategory: '',
  color: '',
  size: '',
  search: '',
  filterPrice: {
    '* to 4000': false,
    '4000 to 6000': false,
    '6000 to 10000': false,
    '10000 to *': false,
  },
};

const CatalogPage = () => {
  const [products, setProducts] = useState<ProductProjection[]>();
  const navigate = useNavigate();

  const [filter, setFilter] = useState<Filters>(defaultFilter);

  function resetFilters() {
    setFilter({ ...defaultFilter });
  }

  function setSort(field: string, direction: string) {
    setFilter({ ...filter, sortField: field, sortDirection: direction });
  }
  function setFilterCategory(category: string) {
    setFilter({ ...filter, filterCategory: category });
  }

  function setSearch(search: string) {
    setFilter({ ...filter, search });
  }
  function setSize(size: string) {
    setFilter({ ...filter, size: size === 'all' ? '' : size });
  }
  function setColor(color: string) {
    setFilter({ ...filter, color: color === 'all' ? '' : color });
  }

  function setPrice(priceRange: keyof PriceFilter, value: boolean) {
    const filterPrice: PriceFilter = { ...filter.filterPrice };
    filterPrice[priceRange] = value;
    setFilter({ ...filter, filterPrice });
  }

  useEffect(() => {
    const requestFilter: string[] = [];

    if (filter.filterCategory) {
      requestFilter.push(`categories.id: subtree("${filter.filterCategory}")`);
    }

    const priceFilterElements: string[] = Object.entries(filter.filterPrice).reduce(
      (acc: string[], curr: [string, boolean]) => {
        if (curr[1]) {
          acc.push(curr[0]);
        }
        return acc;
      },
      [],
    );
    if (priceFilterElements.length) {
      requestFilter.push(`variants.price.centAmount:range (${priceFilterElements.join('),(')})`);
    }

    if (filter.size) {
      requestFilter.push(`variants.attributes.size:"${filter.size}"`);
    }

    if (filter.color) {
      requestFilter.push(`variants.attributes.color.key:"${filter.color}"`);
    }

    const params: GetProdcutsParams = {
      filter: requestFilter,
      sort: `${filter.sortField} ${filter.sortDirection}`,
    };

    if (filter.search) {
      params['text.en'] = filter.search;
      params.fuzzy = true;
    }

    getProducts(params).then((data) => {
      if (data) setProducts(data.results);
    });
  }, [filter]);

  const handleClick = (id: string) => {
    navigate(`/catalog/item/${id}`);
  };

  return (
    <PageWrapper>
      <Header />
      <ContentWrapper>
        <AsideBlock>
          {' '}
          <CatalogFilters
            currentFilters={filter}
            setSort={setSort}
            setPrice={setPrice}
            setFilterCategory={setFilterCategory}
            resetFilters={resetFilters}
            setSearch={setSearch}
            setSize={setSize}
            setColor={setColor}
          />
        </AsideBlock>
        <Grid>
          {products?.map((product) => (
            <ProductCard
              isCatDisplay={true}
              onClick={() => handleClick(product.id)}
              key={product.id}
              productData={product}
            />
          ))}
        </Grid>
      </ContentWrapper>
      <Footer />
    </PageWrapper>
  );
};

export default CatalogPage;
