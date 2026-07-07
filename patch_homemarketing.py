with open("src/components/HomeMarketing.tsx", "r") as f:
    content = f.read()

# Update signature
content = content.replace('export function HomeMarketing() {', 'export function HomeMarketing({ onStartEarning }: { onStartEarning?: () => void }) {')

# Update button
content = content.replace('<button className="btn-secondary text-xs flex items-center gap-2 w-fit">', '<button onClick={onStartEarning} className="btn-secondary text-xs flex items-center gap-2 w-fit cursor-pointer">')

with open("src/components/HomeMarketing.tsx", "w") as f:
    f.write(content)
