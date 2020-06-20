
  self.ballFrameIterator = () => {
    setInterval(() => {
      ++self.ballH.frame;
      if (self.ballH.frame > 3) {
      self.ballH.frame = 0;
      }
    }, 1000)
  };
