import './ProgressCircle.scss';

interface IProgressCircle {
  step: number;
}

const ProgressCirle: React.FC<IProgressCircle> = ({ step }) => {
  return (
    <div className="step-circles-container">
      <div className="step-circle">
        <div className={step ? 'active' : ''}>1</div>
        <div>Information</div>
      </div>
      <div className="step-circle">
        <div className={step === 2 ? 'active' : ''}>2</div>
        <div>Floorplan</div>
      </div>
    </div>
  );
};

export default ProgressCirle;
