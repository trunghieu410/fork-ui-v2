import React, { useRef, useState, useCallback, useContext, useEffect, useMemo, useImperativeHandle } from 'react';
import { omit, debounce, trim, reduce } from 'lodash';

import UISelect from '../../core/Select';
import { useSingleSelect } from '../hooks';

const { Overlay, OverlayHeader, OverlayBody, Option, Single, Searchbox } = UISelect;
const Context = React.createContext({
  selectedOption: null,
  value: '',
  setValue: f => f,
  hideOverlay: f => f,
  filter: f => f,
  searchText: '',
  searchRegex: null,
});

/**
 * Select support both controlled component and uncontrolled component
 */
const Select = React.forwardRef((props, ref) => {
  const {
    value,
    setValue,
    searchboxRef,
    UIRef,
    bounds,
    UIActive,
    onHidden,
    searchText,
    searchRegex,
    onShown,
    onDebouceSearchboxChange,
    hideOverlay,
    selectedOption,
    render,
    renderSearchbox,
    filter,
    children,
    otherProps,
  } = useSingleSelect(props, ref);

  return (
    <Context.Provider value={{
      selectedOption,
      value,
      setValue,
      hideOverlay,
      filter,
      searchText,
      searchRegex,
    }}>
      <UISelect
        overlay={(
          <Overlay style={{ width: bounds.width }}>
            {renderSearchbox && (
              <OverlayHeader>
                {typeof renderSearchbox === 'boolean'
                ? Select.renderSearchbox({
                  ref: searchboxRef,
                  onChange: onDebouceSearchboxChange,
                }) : renderSearchbox({
                  ref: searchboxRef,
                  onChange: onDebouceSearchboxChange,
                })}
              </OverlayHeader>
            )}
            <OverlayBody>
              {children}
            </OverlayBody>
          </Overlay>
        )}
        onShown={onShown}
        onHidden={onHidden}
      >
        {render({
          ...otherProps,
          ref: UIRef,
          active: UIActive,
        }, selectedOption)}
      </UISelect>
    </Context.Provider>
  );
});

Select.Single = Single;
Select.renderSearchbox = props => <Select.Searchbox {...props} />;
Select.defaultProps = {
  delay: 200, // Delay time when you typing ing seachbox
  onChanged: f => f,
  setValue: f => f,

  // default render the main UI
  render: (props, selectedOption) => (
    <Select.Single {...props}>
      {selectedOption.children}
    </Select.Single>
  ),

  // render searchbox
  // set true will render default searchbox
  // callback when you want custom the searchbox
  renderSearchbox: false,

  // the logic to show/hide display option
  filter: (props, { searchRegex }) => {
    if (typeof props.children === 'string') {
      return searchRegex.test(props.children);
    }

    return !!props.children;
  },
};
Select.Option = ({ value, ...otherProps }) => {
  const {
    value: currentValue,
    setValue,
    hideOverlay,
    filter,
    searchText,
    searchRegex,
  } = useContext(Context);
  const onClick = useCallback(() => {
    setValue(value);
    hideOverlay();
  }, [value, setValue, hideOverlay]);

  const hide = useMemo(() => !filter({
    value,
    ...otherProps
  }, {
    searchText,
    searchRegex
  }), [
    value,
    otherProps,
    filter,
    searchText,
    searchRegex,
  ]);

  const _otherProps = useMemo(() => omit(otherProps, ['data']), [otherProps]);
  return (
    <Option
      onClick={onClick}
      active={currentValue === value}
      hide={hide}
      {..._otherProps}
    />
  );
};
Select.Option.defaultProps = {
  value: '',
};

Select.Searchbox = Searchbox;
export default Select;
