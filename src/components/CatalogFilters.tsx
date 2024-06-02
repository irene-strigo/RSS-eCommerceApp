import { FiltersFieldset, SelectElem } from './common/CommonStyles';
import ShowButton from './common/SwitchButton';
import Form from './common/Form';
import { getCategories } from '../services/Client';
import { useEffect, useState } from 'react';
import { Category } from '@commercetools/platform-sdk';
import { Filters, PriceFilter } from '../pages/CatalogPage';

const decode = ((textarea) => (text: string) => {
  textarea.innerHTML = text;
  return textarea.value;
})(document.createElement('textarea'));
const colors = ['all', 'red', 'blue', 'green', 'black', 'white'];
const sizes = ['all', 'XS', 'S', 'M', 'L', 'XL'];

type PriceFilterControls = Record<keyof PriceFilter, string>;

const priceFilterControls: PriceFilterControls = {
  '* to 4000': 'Up to 40',
  '4000 to 6000': '40-60',
  '6000 to 10000': '60-100',
  '10000 to *': 'Above 100',
};

type Props = {
  currentFilters: Filters;
  resetFilters: () => void;
  setSort: (field: string, direction: string) => void;
  setPrice: (filter: keyof PriceFilter, value: boolean) => void;
  setFilterCategory: (category: string) => void;
  setSearch: (search: string) => void;
  setSize: (size: string) => void;
  setColor: (color: string) => void;
};

const onSubmit = async () => {};
const CatalogFilters = ({
  currentFilters,
  setSort,
  setPrice,
  setFilterCategory,
  resetFilters,
  setSearch,
  setSize,
  setColor,
}: Props) => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    getCategories().then((data) => {
      if (data) setCategories(data.results);
    });
  }, []);

  return (
    <Form onSubmit={onSubmit}>
      <label>Goods:</label>
      <SelectElem
        value={currentFilters.filterCategory}
        onChange={(evt) => setFilterCategory(evt.currentTarget.value)}
      >
        <option value="">все</option>
        {categories.map((c) => (
          <option value={c.id}>{c.name.en}</option>
        ))}
      </SelectElem>
      <label>Color:</label>
      <SelectElem
        value={currentFilters.color}
        onChange={(evt) => setColor(evt.currentTarget.value)}
      >
        {colors.map((c) => (
          <option value={c}>{c}</option>
        ))}
      </SelectElem>
      <label>Size:</label>
      <SelectElem value={currentFilters.size} onChange={(evt) => setSize(evt.currentTarget.value)}>
        {sizes.map((c) => (
          <option value={c}>{c}</option>
        ))}
      </SelectElem>
      <FiltersFieldset>
        <legend>Price</legend>
        {Object.entries(priceFilterControls).map(([filter, label]: [keyof PriceFilter, string]) => {
          return (
            <>
              <label>{label}</label>
              <input
                type="checkbox"
                checked={currentFilters.filterPrice[filter]}
                onChange={(evt) => setPrice(filter, evt.currentTarget.checked)}
              />
              <br />
            </>
          );
        })}
      </FiltersFieldset>
      <ShowButton
        label={'Show All'}
        type={'button'}
        disabled={false}
        onClick={(evt) => {
          evt.preventDefault();
          resetFilters();
        }}
      />

      <input
        type="text"
        placeholder="product search"
        value={currentFilters.search}
        onChange={(evt) => setSearch(evt.currentTarget.value)}
      ></input>
      <div>
        <label>sort by price</label>
        <input type="button" value={decode('&#9650')} onClick={() => setSort('price', 'asc')} />
        <input type="button" value={decode('&#9660')} onClick={() => setSort('price', 'desc')} />
        <br />
        <label>sort by name</label>
        <input type="button" value={decode('&#9650')} onClick={() => setSort('name.en', 'asc')} />
        <input type="button" value={decode('&#9660')} onClick={() => setSort('name.en', 'desc')} />
      </div>
    </Form>
  );
};

export default CatalogFilters;
