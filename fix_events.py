with open("src/components/EventsSection.tsx", "r") as f:
    content = f.read()

# I need to insert the missing map code after PageBanner
old_part = """      <PageBanner
        title="LOUD Events"
        subtitle="LIVE STREAMS & TICKETING"
        description="Host masterclasses, participate in community events, and manage ticketing."
        icon={Calendar}
      />
"""

new_part = """      <PageBanner
        title="LOUD Events"
        subtitle="LIVE STREAMS & TICKETING"
        description="Host masterclasses, participate in community events, and manage ticketing."
        icon={Calendar}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map(event => (
          <div key={event.id} className="bg-white border border-slate-200 rounded-2xl overflow-hidden flex flex-col shadow-sm">
            <div className="h-48 relative">
              <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-[10px] font-bold font-mono uppercase shadow-sm">
                {event.type}
              </div>
            </div>"""

content = content.replace(old_part, new_part)

with open("src/components/EventsSection.tsx", "w") as f:
    f.write(content)

