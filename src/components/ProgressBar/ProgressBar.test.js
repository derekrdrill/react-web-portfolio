import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import { ProgressBar, StyledProgressBar, ProgressPercentageContainer, getProgress } from './ProgressBar';

const renderer = new ShallowRenderer();

describe('Progress Bar tests', () => {
  it('renders correctly', () => {
    renderer.render(<ProgressBar progress={10} />);
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });

  it('renders styled progress bar', () => {
    const styledProgressBarTests = [
      { progress: 99, result: 'sc-gEvEer ihJLWS' },
      { progress: 100, result: 'sc-gEvEer jHOkq' },
    ];

    styledProgressBarTests.forEach(({ progress, result }) => {
      renderer.render(<StyledProgressBar progress={progress} />);
      const render = renderer.getRenderOutput();
      const className = render.props.className;

      expect(className).toEqual(result);
    });
  });

  it('renders progress bar percentage container', () => {
    const progressBarPercentageContainerTests = [
      { progress: 99, result: 'sc-eqUAAy kVInel' },
      { progress: 100, result: 'sc-eqUAAy fiJNGc' },
    ];

    progressBarPercentageContainerTests.forEach(({ progress, result }) => {
      renderer.render(<ProgressPercentageContainer progress={progress} />);
      const render = renderer.getRenderOutput();
      const className = render.props.className;

      expect(className).toEqual(result);
    });
  });

  it('gets progress', () => {
    expect(getProgress(null)).toEqual(0);
    expect(getProgress(1)).toEqual(1);
  });
});
