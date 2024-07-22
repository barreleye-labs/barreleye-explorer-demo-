import styled from '@emotion/styled';

const breakpoints = [576, 768, 992, 1200];

const mq = breakpoints.map((bp) => `@media (max-width: ${bp}px)`);

export const Logo = styled.div`
  .bold {
    font-weight: 700;
    font-size: 19px;
  }
  font-size: 18px;
  height: 90px;
  color: white;
  line-height: 90px;
  text-align: center;
  font-weight: 600;

  > span {
    cursor: pointer;
    font-weight: 100;
  }

  ${mq[1]} {
    font-size: 15px;
    height: 35px;
    color: white;
    line-height: 40px;
    text-align: center;
    font-weight: 600;
  }
`;
