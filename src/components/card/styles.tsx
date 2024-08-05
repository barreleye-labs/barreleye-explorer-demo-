import styles from '@emotion/styled';
import ICard from '@mui/joy/Card';
import Content from '@mui/joy/CardContent';

const breakpoints = [576, 768, 992, 1200];

const mq = breakpoints.map((bp) => `@media (max-width: ${bp}px)`);

export const CardContainer = styles.div`
    display: flex;
    justify-content:center;

    .MuiCardContent-root {
      cursor: pointer;
    }

    .MuiCard-root{
      max-width: 304px;
      min-width: 300px;
      width: 100%;
      background: #fcfcfd;
      border: 1px solid #e8eaee;
      border-radius: 20px;
      box-sizing: border-box;
      display: flex;
      flex-wrap: wrap;
      flex-direction: column;
      justify-content: space-between;
      min-height: 90px;
      padding: 32px 15px;
      position: relative;
      height: 300px;
      display: inline-block;
      perspective: 1000;
      position: relative;
      transition: all 0.3s 0s ease-in;
      z-index: 1;

      .copy-icon {
        svg {
          font-size: 11px;
          margin-left: 5px;
          cursor: pointer;
        }
      }

      .card-flap-wrapper{
        margin-top: 3rem;

        .MuiTypography-body-md{
          font-family: Gilroy, sans-serif;
          font-size: 13px;
          font-stretch: normal;

          font-style: normal;
          font-weight: 600;
          letter-spacing: .2px;
          line-height: 1.79;
          margin-bottom: 0;
          color: #354052;
        }
       
    
        .MuiTypography-colorNeutral{
          color: #7f8fa4;
          font-family: Gilroy, sans-serif;
          font-size: 13px;
          font-stretch: normal;
          font-style: normal;
          font-weight: 600;
          letter-spacing: -.2px;
          line-height: 1.79;
          margin-bottom: 0;
          white-space: nowrap;
          margin-top: 1rem;
        }
      }
      
      .card-flap {
        background: ##fcfcfd;
        width: 100%;
        transform-origin: top;
        transform: rotateX(-90deg);background: ##fcfcfd;
        
      .value {
          font-size: 12px;
          overflow-wrap: break-word;
        }
      }
        
      .flap1 {
        transition: all 0.1s 0.2s ease-out;
        z-index: -1;
      }
      
      .flap2 {
        transition: all 0.1s 0s ease-out;
        z-index: -2;
      }
    }

    .icons {
     margin-top: 1.3rem;
     button{
        &:hover {
          svg{
            color: white;
          }
        }
        text-align: center;
        svg {
          color: #dfdede;
        }
      }
    }

    .active {
      transition: all 0.3s 0s ease-in;
      height: 560px;
      opacity: 1 !important;
      transform: scale(1) !important;
        
      .card-flap {
        background: ##fcfcfd !important;
        transform: rotateX(0deg);
      }
      .flap1 {
        transition: all 0.6s 0s ease-out;
      }
      .flap2 {
        transition: all 0.6s 0.2s ease-out;
      }
   }
`;

export const CardContent = styles(Content)`
  .title-wrapper{
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
    .title, .description {
      font-family: Gilroy, sans-serif;
      font-stretch: normal;
      font-style: normal;
      font-weight: 800;
      line-height: 1.3;
      margin-bottom: 0;
    }
    .title {
      color: #46546c;
      font-size: 20px;
    }
    .description {
      font-size: 14px;
      color: rgb(119, 126, 144);
    }
  }
  .sub{
      color: #777e90;
      font-family: Gilroy, sans-serif;
      font-size: 13px;
      font-style: normal;
      font-weight: 500;
      letter-spacing: .35px;
      line-height: 17px;
      margin-bottom: 0;
      text-align: center;
  }
  
  .MuiButtonBase-root {
    margin: 0 auto;
  }
  .content-wrapper{
    margin-top: 1rem;
    align-items: flex-start;
    display: flex;
    justify-content: space-between;
    width: 100%;
    .left {
      width: 100%;
    }
    .right {
       width: 100%;
    }
    .divider {
      background: #e6e8ec;
      height: 100%;
      width: 1px;
    }
    
    .value {
      color: #777e90;
      font-family: Gilroy, sans-serif;
      font-size: 16px;
      font-style: normal;
      font-weight: 600;
      letter-spacing: .4px;
      line-height: 20px;
      margin-bottom: 3px;
      text-align: center;
    }
    
    .key{
      font-family: Gilroy, sans-serif;
      font-size: 14px;
      font-style: normal;
      font-weight: 600;
      letter-spacing: .35px;
      text-align: center;
      color: #b1b5c4;
      display: block;
      line-height: 17px;
    }
    
  }
    
  }
`;

interface CustomCardProps {
  background?: string;
}

export const CustomCard = styles.div<CustomCardProps>`
.MuiCard-root{
  cursor: pointer;
  background-color: ${(props) => props.background};
  border: 1px solid #d3e7e4;
  flex-direction: row;
  justify-content: space-between;
  .MuiCardContent-root{
    display: flex;
    flex-direction: column;
    padding: 12px;
  }

   &:hover{
      box-shadow: rgba(145, 158, 171, 0.2) 0px 0px 2px 0px,rgba(145, 158, 171, 0.12) 0px 12px 24px -4px;
    }
   ${mq[1]} {
     .MuiTypography-h5{
        font-size: 16px;
     }
     .link{
        font-size:12px;
     }  
   }
   
   
  .wrapper {
    padding: 31px 24px;
    display: flex;
    align-items: center;
    h4 {
      font-weight: 600;
      line-height: 1.57143;
      font-size: 14px;
      color: rgb(145, 158, 171);
    }
    h2 {
      color: #212b36;
      font-size: 27px;
      font-weight: 900;
      margin: 0;
      span {
        font-size: 13px;
        font-weight: 600;
        margin-left: 3px;
      }
    }

    .icon-wrapper {
      color: #34b4a9;
      background: #e5fbf8;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      margin-right: 16px;
      border-radius: 50%;
      box-shadow:
        rgba(95, 116, 141, 0.03) 0px 2px 1px -1px,
        rgba(95, 116, 141, 0.04) 0px 1px 1px 0px,
        rgba(95, 116, 141, 0.08) 0px 1px 3px 0px;
      .MuiSvgIcon-root {
        user-select: none;
        width: 1em;
        height: 1em;
        display: inline-block;
        fill: currentcolor;
        flex-shrink: 0;
        transition: fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
        font-size: 1.5rem;
      }
    }
  }
}
`;

export const DefaultCard = styles.div`
.MuiCard-root{
  background-color: rgb(255, 255, 255);
  color: rgb(33, 43, 54);
  box-shadow: rgba(145, 158, 171, 0.2) 0px 0px 2px 0px,rgba(145, 158, 171, 0.12) 0px 12px 24px -4px;

 }
 
  .MuiCardActions-root{
      float: right;
      margin-top:3rem;
   }
`;
export const Container = styles(ICard)`
  min-width: 80%;
  margin: 0 auto;

  
  ${mq[1]} {
      width: 100%;
      padding: 1rem;
  }
  border: none;
  border-radius: 16px;

  .MuiTypography-h5{
    font-weight: 700;
  }
  
  .warning {
    color: #c73d3d;
  }
  
  .info {
    color: #00987b;
  }
  
  .input-wrapper{
    width: 96%;
    margin: 0 auto;
    margin-top: 2rem;
  }
  
  .button{
    font-size: 1rem;
    font-weight: 700;
    color:#34b4a9;
    background: #e5fbf8;
   
    &:disabled {
       color: #ffffff;
       background: #ececec;
    }
  }
  
  .icon-wrapper{
    position:absolute;
    top: 2rem;
    right: 2rem;
  }
  
  .MuiFormControl-root{
    width: 100%;
  }
  
  .return {
    color: #00987b;
    margin-bottom: 1rem;
    padding: 0;
    margin: 0;
    min-width: 0px;
    gap: 5px;
    svg{
      font-size:13px;
    }
  }
  
  .link{
    text-align: left;
  }
 }
`;
