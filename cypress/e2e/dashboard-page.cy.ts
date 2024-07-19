// eslint-disable-next-line @typescript-eslint/no-var-requires
const { BLOCKS_ITEMS, TX_ITEMS } = require('../fixtures');

describe('My First Test', () => {
  beforeEach(() => {
    cy.visit('dashboard');
  });

  it('대시보드에 진입시 Blocks API를 요청 후 7개의 블록 아이템을 조회한다.', () => {
    cy.intercept('/blocks?page=1&size=7', BLOCKS_ITEMS).as('getBlocks');
    cy.getByCy('block_items').should('have.length', 0);
  });

  it('대시보드에 진입시 Transactions API를 요청 후 7개의 트랜잭션을 조회한다.', () => {
    cy.intercept('/transactions?page=1&size=7', TX_ITEMS).as('getTxs');
    cy.getByCy('tx_items').should('have.length', 0);
  });
});
