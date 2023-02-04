rm -rf npm && tsc --project ./tsconfig.build.json
cp package.build.json npm/package.json
cp README.build.md npm/README.md
