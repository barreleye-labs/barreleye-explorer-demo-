import styles from '@emotion/styled';

export const Container = styles.div`
  .MuiCardHeader-content {
    display: flex !important;
    align-items: center;
    gap:1rem;
  }

  .MuiCardHeader-root,
  .MuiCardContent-root{
    padding: 24px;
  }

  .MuiCardHeader-title,
  .MuiCardHeader-title {
    font-size: 14px;
  }

  .MuiCardHeader-title{
    font-weight: 300;
    margin-right: 8px;
  }

  .MuiCardHeader-subheader{
    font-weight: 800;
    color: #000000;
  }

  .MuiCardHeader-avatar{
    color: #00d695;
    font-size: 23px;
    margin-right:8px;
  }

  .MuiPaper-rounded{
    border-radius: 16px;
  }
`;
