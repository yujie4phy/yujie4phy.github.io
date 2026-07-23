import type { Metadata } from "next";
import { SiteShell } from "../components/SiteShell";
import { profile } from "../site-data";

export const metadata: Metadata = {
  title: `Research — ${profile.givenName} ${profile.familyName}`,
  description:
    "Research in operational quantum nonclassicality, optical quantum information processing, quantum networks, and AI-assisted quantum science.",
};

export default function ResearchPage() {
  return (
    <SiteShell
      current="research"
      pageTitle="research"
      pageDescription="Foundations, information processing, and optical quantum networks"
      pageHeadingVariant="compact"
    >
      <section className="research-overview" aria-labelledby="research-overview">
        <h2 id="research-overview">Research overview</h2>
        <p>
          My research seeks to understand what is genuinely nonclassical about
          quantum theory and to translate that understanding into useful
          protocols for quantum information processing. My work combines
          quantum foundations and quantum information theory with experimental
          and theoretical quantum optics.
        </p>
        <p>My current research is organized around three interconnected themes:</p>
        <ul className="research-topic-list">
          <li>
            developing operational frameworks for defining, certifying, and
            quantifying quantum nonclassicality;
          </li>
          <li>
            advancing optical quantum information processing for communication,
            sensing, and quantum networks;
          </li>
          <li>
            exploring broader directions in quantum information and AI-assisted
            quantum science.
          </li>
        </ul>
      </section>

      <section className="research-theme" aria-labelledby="nonclassicality">
        <header className="research-theme-heading">
          <h2 id="nonclassicality">
            Operational Foundations of Quantum Nonclassicality
          </h2>
        </header>
        <div className="research-copy">
          <p>
            A central question in my research is how to identify what is
            genuinely nonclassical about quantum theory. I approach this
            question operationally: rather than relying on a particular
            mathematical representation, I seek definitions and tests of
            nonclassicality that can be expressed directly in terms of
            laboratory procedures and observable statistics.
          </p>
          <p>
            My work studies several related manifestations of nonclassicality,
            including measurement incompatibility, generalized contextuality,
            entanglement, quantum steering, Bell nonlocality, and negativity in
            quasiprobability representations. I am particularly interested in
            understanding the relationships among these phenomena and in
            developing systematic methods to <strong>define</strong>,{" "}
            <strong>certify</strong>, and <strong>quantify</strong> the resources
            they represent.
          </p>
          <p>
            From a foundational perspective, this program aims to distinguish
            genuinely quantum phenomena from effects that can arise through
            classical mechanisms, such as incomplete information, epistemic
            restrictions, or limited operational access. Comparisons with
            broader post-quantum theories can also help reveal which features of
            nonclassicality are specific to quantum theory, which extend beyond
            it, and which structural principles constrain the correlations
            permitted by nature.
          </p>
          <p>
            These questions are also important for quantum technology.
            Identifying the relevant nonclassical resource can explain the
            origin of a quantum advantage in an existing protocol. It can also
            suggest new measurements, encodings, and information-processing
            tasks that use the resource more effectively.
          </p>
        </div>

        <h3 className="related-work-heading">Selected related work</h3>
        <ul className="research-papers">
          <li>
            <a href="https://arxiv.org/abs/2503.05884">
              Reassessing the Boundary between Classical and Nonclassical for
              Individual Quantum Processes
            </a>
            <span>
              A unified, generalized-noncontextuality-based classical–nonclassical
              boundary for individual quantum processes.
            </span>
          </li>
          <li>
            <a href="https://arxiv.org/abs/2504.02944">
              Quantifiers and Witnesses for the Nonclassicality of Measurements
              and of States
            </a>
            <span>
              Quantitative measures and experimentally accessible witnesses for
              the nonclassicality of measurements and states.
            </span>
          </li>
          <li>
            <a href="https://arxiv.org/abs/2507.01122">
              Entanglement Certification with Noncontextuality Inequalities
            </a>
            <span>
              A hierarchy of noncontextuality inequalities connecting
              entanglement, steering, and Bell nonlocality.
            </span>
          </li>
          <li>
            <a href="https://arxiv.org/abs/2309.09960">
              Exact Steering Bound for Two-Qubit Werner States
            </a>
            <span>
              The Werner-state steering threshold under general measurements
              and its connection to measurement incompatibility.
            </span>
          </li>
          <li>
            <a href="https://arxiv.org/abs/2302.09060">
              Cost of Simulating Entanglement in Steering Scenarios
            </a>
            <span>
              The shared-randomness resources required to simulate entangled
              states in steering experiments.
            </span>
          </li>
          <li>
            <a href="https://arxiv.org/abs/1911.06349">
              Channel Activation of CHSH Nonlocality
            </a>
            <span>
              How channels that individually destroy CHSH nonlocality can
              activate nonlocal state distribution when used together.
            </span>
          </li>
          <li>
            <a href="https://arxiv.org/abs/2006.12475">
              Building Multiple Access Channels with a Single Particle
            </a>
            <span>
              How single-particle superposition enables communication strategies
              unavailable to a classical particle.
            </span>
          </li>
          <li>
            <a href="https://arxiv.org/abs/2012.14026">
              Superresolution in Interferometric Imaging of Strong Thermal
              Sources
            </a>
            <span>
              Measurements that overcome conventional resolution limitations in
              optical imaging.
            </span>
          </li>
        </ul>
      </section>

      <section className="research-theme" aria-labelledby="optical-networks">
        <header className="research-theme-heading">
          <h2 id="optical-networks">
            Optical Quantum Information Processing and Quantum Networks
          </h2>
        </header>
        <div className="research-copy">
          <p>
            My background spans both theory and experiment in optical quantum
            information. This training has given me a practical understanding of
            both the capabilities and the limitations of photonic quantum
            technologies.
          </p>
          <p>
            Photonic platforms face significant challenges as architectures for
            scalable, universal quantum computation, particularly when compared
            with leading solid-state platforms. However, photons are
            exceptionally well suited to transmitting quantum information and
            connecting distant systems. Optical quantum information processing
            therefore plays a central role in quantum communication, distributed
            quantum sensing, and metrology.
          </p>
        </div>

        <div className="research-subtheme">
          <h3>Quantum-enhanced sensing and astronomical imaging</h3>
          <p>
            I develop and analyze protocols for imaging astronomical objects
            using quantum communication, shared entanglement, and nonstandard
            optical measurements. This includes establishing fundamental
            precision limits, designing protocols that approach those limits,
            and investigating experimentally realizable measurements for
            sub-Rayleigh imaging, including our array-SPADE approach.
          </p>
          <ul className="research-papers">
            <li>
              <a href="https://arxiv.org/abs/2606.27276">
                Quantum-Limited Subdiffraction Telescopy Requires Genuine
                Multi-Telescope Interference
              </a>
              <span>
                The ultimate limits of distributed subdiffraction imaging and
                the role of genuine multi-telescope interference.
              </span>
            </li>
            <li>
              <a href="https://arxiv.org/abs/2501.16670">
                Criteria for Optimal Entanglement-Assisted Long Baseline
                Telescopy
              </a>
              <span>
                Astronomical imaging under superselection-rule constraints and
                protocols that approach the optimal quantum limit.
              </span>
            </li>
            <li>
              <a href="https://arxiv.org/abs/2308.12851">
                Astronomical Interferometry Using Continuous-Variable Quantum
                Teleportation
              </a>
              <span>
                A continuous-variable teleportation architecture for
                long-baseline interferometry.
              </span>
            </li>
            <li>
              <a href="https://arxiv.org/abs/2412.17223">
                Temporally Localized Quantum Operations on Continuous-Wave
                Thermal Light
              </a>
              <span>
                A temporal-mode framework for processing continuous-wave thermal
                light in sensing and astronomy.
              </span>
            </li>
            <li>
              <a href="https://arxiv.org/abs/2012.14026">
                Superresolution in Interferometric Imaging of Strong Thermal
                Sources
              </a>
              <span>
                Interferometric superresolution beyond conventional
                direct-imaging limits.
              </span>
            </li>
          </ul>
        </div>

        <div className="research-subtheme">
          <h3>Quantum communication and resource distribution</h3>
          <p>
            I study how quantum information and nonclassical resources can be
            transmitted, certified, and used across noisy and experimentally
            realistic networks. My interests include frequency-bin encodings,
            multimode free-space channels, entanglement distribution, and
            communication protocols based on limited quantum resources.
          </p>
          <ul className="research-papers">
            <li>
              <a href="https://arxiv.org/abs/2508.10200">
                Time-Resolved Certification of Frequency-Bin Entanglement Over
                Multi-Mode Channels
              </a>
              <span>
                Certification of high-dimensional frequency-bin entanglement
                transmitted through multimode channels.
              </span>
            </li>
            <li>
              <a href="https://arxiv.org/abs/2412.06104">
                Feasibility Study of Frequency-Encoded Photonic Qubits Over a
                Free-Space Channel
              </a>
              <span>
                Transmission and decoding of frequency-bin qubits over
                fluctuating free-space links.
              </span>
            </li>
            <li>
              <a href="https://arxiv.org/abs/2301.02513">
                Information Carried by a Single Particle in Quantum
                Multiple-Access Channels
              </a>
              <span>
                Communication rates and quantum advantages in multiple-access
                channels constructed from a single particle.
              </span>
            </li>
            <li>
              <a href="https://arxiv.org/abs/1911.06349">
                Channel Activation of CHSH Nonlocality
              </a>
              <span>
                How network structure can activate nonlocal resources that are
                inaccessible through individual noisy channels.
              </span>
            </li>
          </ul>
        </div>

        <div className="research-subtheme">
          <h3>Real-world quantum-network testbeds</h3>
          <p>
            I have also helped lead the development of realistic quantum-network
            links that serve as testbeds for quantum networking in practice.
            This work connects photon-source engineering, fiber transmission,
            entanglement distribution, control systems, and public-facing
            quantum-science infrastructure.
          </p>
          <ul className="research-papers">
            <li>
              <a href="https://arxiv.org/abs/2410.06398">
                Public Quantum Network: The First Node
              </a>
              <span>
                A metropolitan quantum-network node connecting the University of
                Illinois Urbana–Champaign with the Urbana Free Library.
              </span>
            </li>
            <li>
              <a href="https://arxiv.org/abs/1904.05278">
                Dual-Pump Approach to Photon-Pair Generation
              </a>
              <span>
                Experimental engineering and characterization of photonic
                quantum sources.
              </span>
            </li>
            <li>
              <a href="https://arxiv.org/abs/2212.13652">
                Fiber-Based Photon-Pair Generation
              </a>
              <span>
                A tutorial treatment of spontaneous four-wave mixing and
                photon-pair engineering in optical fibers.
              </span>
            </li>
          </ul>
        </div>
      </section>

      <section className="research-theme" aria-labelledby="broader-directions">
        <header className="research-theme-heading">
          <h2 id="broader-directions">
            Broader Directions in Quantum Information and AI for Quantum Science
          </h2>
        </header>
        <div className="research-copy">
          <p>
            I am broadly interested in other areas of quantum information
            science, particularly quantum Shannon theory, quantum error
            correction, quantum learning theory, and the principles governing
            information processing across different physical platforms. I would
            like to deepen my understanding of experimental architectures beyond
            optics and investigate which ideas and resources can be transferred
            between platforms.
          </p>
          <p>
            I am also interested in the emerging role of artificial intelligence
            in quantum science. AI systems may become useful collaborators for
            literature synthesis, analytic and numerical exploration, hypothesis
            generation, and the discovery of unexpected connections between
            different areas of physics. At the same time, frontier problems in
            quantum science provide demanding tests of whether an AI system can
            perform sustained scientific reasoning rather than reproduce familiar
            patterns.
          </p>
          <p>
            My work on{" "}
            <a href="https://arxiv.org/abs/2509.26574">
              CritPt: A Frontier Physics Research Benchmark
            </a>{" "}
            contributes to evaluating AI reasoning on research-level physics
            problems. Looking forward, I am interested in developing AI-assisted
            approaches that strengthen physical understanding, help researchers
            explore difficult problems, and support—rather than obscure—the
            conceptual reasoning at the heart of quantum science.
          </p>
        </div>
      </section>
    </SiteShell>
  );
}
