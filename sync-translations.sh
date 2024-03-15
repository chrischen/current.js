# Syncs back translations in the master compendium into the component/entrypoint message bundles.
find src/locales/src/components -name "jp.po" -type f -exec msgmerge --compendium src/locales/jp.po /dev/null {} -o {} \;
find src/locales/src/components -name "en.po" -type f -exec msgmerge --compendium src/locales/en.po /dev/null {} -o {} \;
