import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';

import { ProductProjection } from '@commercetools/platform-sdk';

import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

import { GetProductsParams, getProducts } from '../services/Client';

import { Header, Footer, ProductCard } from '../components';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ContentWrapper, PageWrapper } from '../components/common/CommonStyles';
import { Grid } from '../components/common';
import CatalogFilters from '../components/CatalogFilters';

const FiltersDiv = styled.div`
  color: #511f31;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  margin-bottom: 10px;

  &:hover {
    border-color: #511f31;
  }
`;

export type PriceFilter = Record<string, boolean>;

export type Filters = {
  sortField: string;
  sortDirection: string;
  filterCategory: string;
  color: string;
  size: string;
  search: string;
  filterPrice: PriceFilter;
  limit: number;
  offset: number;
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
  limit: 6,
  offset: 0,
};

const CatalogPage = () => {
  const [isModal, setIsModal] = useState(false);

  const [products, setProducts] = useState<ProductProjection[]>([]);
  const navigate = useNavigate();

  const [filter, setFilter] = useState<Filters>(defaultFilter);

  function resetFilters() {
    setFilter({ ...defaultFilter });
  }

  function setSort(field: string, direction: string) {
    setFilter({ ...filter, sortField: field, sortDirection: direction });
  }
  function setFilterCategory(category: string) {
    setFilter({ ...filter, filterCategory: category, offset: 0 });
  }

  function setSearch(search: string) {
    setFilter({ ...filter, search, offset: 0 });
  }
  function setSize(size: string) {
    setFilter({ ...filter, size: size === 'all' ? '' : size, offset: 0 });
  }
  function setColor(color: string) {
    setFilter({ ...filter, color: color === 'all' ? '' : color, offset: 0 });
  }

  function setPrice(priceRange: keyof PriceFilter, value: boolean) {
    const filterPrice: PriceFilter = { ...filter.filterPrice };
    filterPrice[priceRange] = value;
    setFilter({ ...filter, filterPrice, offset: 0 });
  }

  const ref = useRef<HTMLDivElement>(null);

  const handleScroll = (e: React.SyntheticEvent<HTMLDivElement, UIEvent>) => {
    const scrollPosition = (e.target as HTMLDivElement).scrollTop;
    const currentPage = filter.offset / filter.limit;

    if (scrollPosition > 580 * (currentPage + 1)) {
      setFilter({ ...filter, offset: (currentPage + 1) * filter.limit });
    }
  };

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

    const params: GetProductsParams = {
      filter: requestFilter,
      sort: `${filter.sortField} ${filter.sortDirection}`,
      limit: filter.limit,
      offset: filter.offset,
    };

    if (filter.search) {
      params['text.en'] = filter.search;
      params.fuzzy = true;
    }

    getProducts(params).then((data) => {
      if (data) {
        if (filter.offset) {
          setProducts([...products, ...data.results]);
        } else {
          setProducts([...data.results]);
        }
      }
    });
  }, [filter]);

  const handleClick = (id: string) => {
    navigate(`/catalog/item/${id}`);
  };

  return (
    <PageWrapper>
      <Header />
      <ContentWrapper ref={ref} onScroll={handleScroll} $alignItems={'center'}>
        <FiltersDiv onClick={() => setIsModal(true)}>Filters</FiltersDiv>
        <Modal open={isModal} onClose={() => setIsModal(false)} center>
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
        </Modal>
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
        <ToastContainer />
      </ContentWrapper>
      <Footer />
    </PageWrapper>
  );
};

export default CatalogPage;
