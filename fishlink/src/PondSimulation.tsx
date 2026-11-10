import React, { useState } from "react";

/**
 * Integration contract for the FishLink pond-animation team.
 * Replace ONLY the contents of this component with the actual animation.
 * The My Farms navigation and the rest of FishLink do not need to change.
 */
export type SimulationFarm = {
  id: string;
  name: string;
  location: string;
};

export type SimulationPond = {
  id: string;
  farmId: string;
  name: string;
  population: number;
  length: number;
  width: number;
  status: string;
};

type Props = {
  farms: SimulationFarm[];
  ponds: SimulationPond[];
};

export default function PondSimulation({ farms, ponds }: Props) {
  const [selectedPondId, setSelectedPondId] = useState(ponds[0]?.id ?? "");
  const selectedPond = ponds.find((pond) => pond.id === selectedPondId);
  const selectedFarm = farms.find((farm) => farm.id === selectedPond?.farmId);

  return (
    <div className="pond-sim-page">
      <section className="pond-sim-hero">
        <div className="pond-sim-hero-copy">
          <span className="pond-sim-eyebrow">FISHLINK · INTERACTIVE LAB</span>
          <h2>Live Pond Simulation</h2>
          <p>
            Explore a virtual fish pond and observe its environment. The animated
            simulation will be connected here by the FishLink simulation team.
          </p>
          <div className="pond-sim-status"><span /> Simulation workspace ready for integration</div>
        </div>
        <div className="pond-sim-hero-art" aria-hidden="true">🐟</div>
      </section>

      <section className="pond-sim-context panel">
        <div className="pond-sim-section-heading">
          <div>
            <h3>Simulation environment</h3>
            <p>Select a registered pond to provide context to the simulation.</p>
          </div>
          <span className="pond-sim-tag">ANIMATION SLOT</span>
        </div>

        {ponds.length > 0 ? (
          <div className="pond-sim-select-row">
            <label htmlFor="pond-simulation-select">Connected FishLink pond</label>
            <select
              id="pond-simulation-select"
              value={selectedPondId}
              onChange={(event) => setSelectedPondId(event.target.value)}
            >
              {ponds.map((pond) => (
                <option key={pond.id} value={pond.id}>{pond.name}</option>
              ))}
            </select>
          </div>
        ) : (
          <div className="pond-sim-empty-context">
            No registered ponds yet. You can still build and test the animation independently;
            pond data will become available here when a pond is added in My Farms.
          </div>
        )}

        {selectedPond && (
          <div className="pond-sim-context-grid">
            <div><small>Pond</small><strong>{selectedPond.name}</strong></div>
            <div><small>Farm</small><strong>{selectedFarm?.name ?? "Farm not found"}</strong></div>
            <div><small>Stock population</small><strong>{selectedPond.population.toLocaleString()} fish</strong></div>
            <div><small>Dimensions</small><strong>{selectedPond.length} × {selectedPond.width} m</strong></div>
          </div>
        )}
      </section>

      {/*
        FUTURE ANIMATION MOUNT POINT
        The simulation developer can replace this placeholder with their React
        animation component, canvas, Three.js scene, or a secured iframe.
        Props already available above: selectedPond, selectedFarm, farms, ponds.
        Keep the outer .pond-sim-stage container so the page layout remains stable.
      */}
      <section className="pond-sim-stage" id="fishlink-pond-simulation-stage">
        <div className="pond-sim-stage-inner">
          <div className="pond-sim-stage-icon">◉</div>
          <span className="pond-sim-stage-label">ANIMATION VIEWPORT</span>
          <h3>Your interactive pond will appear here</h3>
          <p>
            This space is intentionally reserved for the standalone pond animation.
            No artificial animation or fish-growth calculation is running in this page.
          </p>
          <div className="pond-sim-stage-specs">
            <span>Responsive viewport</span><span>React / Canvas / Three.js ready</span><span>FishLink pond data available</span>
          </div>
        </div>
      </section>

      <section className="pond-sim-integration-note">
        <span>↗</span>
        <div>
          <strong>For the simulation developer</strong>
          <p>
            Build the animation as an independent component and mount it inside
            <code> #fishlink-pond-simulation-stage </code> in this file. Use the
            selected pond object as the initial data source. See the integration
            guide included with this project.
          </p>
        </div>
      </section>
    </div>
  );
}
