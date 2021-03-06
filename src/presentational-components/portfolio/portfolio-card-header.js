import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  Badge,
  Level,
  LevelItem,
  Text,
  TextContent,
  TextVariants
} from '@patternfly/react-core';
import EllipsisTextContainer from '../styled-components/ellipsis-text-container';
import styled from 'styled-components';

const HeaderTitle = styled(LevelItem)`
  max-width: calc(100% - 80px);
  width: calc(100% - 80px);
`;

const HeaderLevel = styled(Level)`
  width: 100%;
`;

const PortfolioCardHeader = ({
  id,
  to,
  portfolioName,
  portfolio_items,
  headerActions
}) => (
  <HeaderLevel>
    <HeaderTitle>
      <TextContent>
        <Link to={to} id={`portfolio-link-${id}`}>
          <Text
            title={portfolioName}
            className="pf-u-mb-0"
            component={TextVariants.h3}
          >
            <EllipsisTextContainer>{portfolioName}</EllipsisTextContainer>
          </Text>
        </Link>
      </TextContent>
    </HeaderTitle>
    <Badge isRead>{portfolio_items}</Badge>
    <div onClick={(event) => event.preventDefault()}>{headerActions}</div>
  </HeaderLevel>
);

PortfolioCardHeader.propTypes = {
  portfolioName: PropTypes.string.isRequired,
  portfolio_items: PropTypes.number,
  headerActions: PropTypes.node,
  id: PropTypes.string,
  to: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
    search: PropTypes.string.isRequired
  }).isRequired
};

PortfolioCardHeader.defaultProps = {
  headerActions: []
};

export default PortfolioCardHeader;
