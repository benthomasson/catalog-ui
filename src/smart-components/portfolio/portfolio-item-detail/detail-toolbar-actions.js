import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Dropdown, DropdownItem, DropdownPosition, DropdownSeparator, KebabToggle, LevelItem } from '@patternfly/react-core';
import ButtonWithSpinner from '../../../presentational-components/shared/button-with-spinner';

const DetailToolbarActions = ({ copyUrl, orderUrl, editUrl, workflowUrl, isOpen, setOpen, isFetching }) => ( // eslint-disable-line no-unused-vars
  <Fragment>
    <LevelItem>
      <Link disabled={ isFetching } to={ orderUrl }>
        <ButtonWithSpinner isDisabled={ isFetching } showSpinner={ isFetching } variant="primary">Order</ButtonWithSpinner>
      </Link>
    </LevelItem>
    {
      <LevelItem style={ { marginLeft: 16 } }>
        <Dropdown
          isPlain
          onToggle={ setOpen }
          onSelect={ () => setOpen(false) }
          position={ DropdownPosition.right }
          toggle={ <KebabToggle onToggle={ isOpen => setOpen(isOpen) }/> }
          isOpen={ isOpen }
          dropdownItems={ [
            <DropdownItem aria-label="Edit Portfolio" key="edit-portfolio" component={ <Link to={ editUrl }>Edit</Link> } role="link"/>,
            <DropdownItem aria-label="Copy Portfolio" key="copy-portfolio" component={ <Link to={ copyUrl }>Copy</Link> } role="link"/>,
            <DropdownSeparator key="workflow-portfolio-separator"/>,
            <DropdownItem
              aria-label="Edit Approval Workflow"
              key="edit-approval_workflow"
              component={ <Link to={ workflowUrl }>Edit approval</Link> }
              role="link"
            />
          ] }
        />
      </LevelItem>
    }
  </Fragment>
);

DetailToolbarActions.propTypes = {
  orderUrl: PropTypes.string.isRequired,
  editUrl: PropTypes.string.isRequired,
  copyUrl: PropTypes.string.isRequired,
  workflowUrl: PropTypes.string.isRequired,
  isOpen: PropTypes.bool,
  setOpen: PropTypes.func.isRequired,
  isFetching: PropTypes.bool
};

DetailToolbarActions.defaultProps = {
  isFetching: false
};

export default DetailToolbarActions;
