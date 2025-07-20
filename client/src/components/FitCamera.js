import { useBounds } from '@react-three/drei';
import { forwardRef, useImperativeHandle } from 'react';

const FitCamera = forwardRef((props, ref) => {
  const bounds = useBounds();

  useImperativeHandle(ref, () => ({
    fit: () => {
      bounds.refresh().clip().fit();
    }
  }));

  return null;
});

export default FitCamera;