import { FiltersFieldset, SelectElem } from './common/CommonStyles';
import ShowButton from './common/SwitchButton';
import Form from './common/Form';

const decode = ((textarea) => (text: string) => {
  textarea.innerHTML = text;
  return textarea.value;
})(document.createElement('textarea'));
const goods = ['all', 'evening dresses', 'casual dresses', 'shirts'];
const colors = ['all', 'red', 'blue', 'green', 'black', 'white'];
const sizes = ['all', 'XS', 'S', 'M', 'L'];

const onSubmit = async () => {};
const CatalogFilters = () => {
  return (
    <Form onSubmit={onSubmit}>
      <label>Goods:</label>
      <SelectElem>
        {goods.map((c) => (
          <option>{c}</option>
        ))}
      </SelectElem>
      <label>Color:</label>
      <SelectElem>
        {colors.map((c) => (
          <option>{c}</option>
        ))}
      </SelectElem>
      <label>Size:</label>
      <SelectElem>
        {sizes.map((c) => (
          <option>{c}</option>
        ))}
      </SelectElem>
      <FiltersFieldset>
        <legend>Price</legend>
        <label>Up to 40</label>
        <input type="checkbox" />
        <br />
        <label>40-60</label>
        <input type="checkbox" />
        <br />
        <label>60-100</label>
        <input type="checkbox" />
        <br />
        <label>Above 100</label>
        <input type="checkbox" />
        <br />
      </FiltersFieldset>
      <ShowButton
        label={'Show All'}
        type={'button'}
        disabled={false}
        onClick={() => console.log('show all goods')}
      />

      <input type="text" placeholder="product search"></input>
      <div>
        <label>sort by price</label>
        <input type="button" value={decode('&#9650')} />
        <input type="button" value={decode('&#9660')} />
        <br />
        <label>sort by name</label>
        <input type="button" value={decode('&#9650')} />
        <input type="button" value={decode('&#9660')} />
      </div>
    </Form>
  );
};

export default CatalogFilters;
