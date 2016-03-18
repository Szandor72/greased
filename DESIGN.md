validation component

type specific editors
- including a generic wrapper component that checks field type so that only fieldName is required
- editors send type required to server which drives translation so different editors can r/w single db types
- client sends all editors field requirements to server at load time and server dynamically/securley provides them (with explicit nulls)

generic apex handler
