@live
type preloadPriority = High | Default | Low

type preloadComponentAsset = {
  @as("__$rescriptChunkName__") chunk: string,
  load: unit => unit,
}

@live
type preloadAsset =
  | Component(preloadComponentAsset)
  | Image({url: string})
  | Style({url: string})

type preloadAssetFn = (~priority: preloadPriority, preloadAsset) => unit
