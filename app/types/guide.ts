export interface Guide {
    title: string;
    type: string;
    rating: string;
    image: string;
    introText: string;
    materialString: string;
    toolString: string;
    cuttingString: string;
    numberedSteps: string;
    concText: string;
  }
  
  export interface GuideType {
    value: string;
    name: string;
  }