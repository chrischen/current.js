import { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: 'http://localhost:4555/graphql',
  // documents: ['src/**/*.tsx'],
  generates: {
    './data/schema.graphql': {
      plugins: ['schema-ast']
    }
  }
}

export default config
